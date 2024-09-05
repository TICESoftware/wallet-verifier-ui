import {type DecodedSDJwt, decodeSdJwt, getClaims} from "@sd-jwt/decode";
import {digest} from "@sd-jwt/crypto-browser";
import type {TagValue} from "~/models/TagValue";
import * as cbor from 'cbor-web';
import {Buffer} from 'buffer';
import type {ClaimEntry} from "~/models/ClaimEntry";

export async function getSdJwtClaims(vpToken: string): Promise<ClaimEntry[] | undefined> {
    try {
        const decodedSdJwt: DecodedSDJwt = await decodeSdJwt(vpToken, digest);
        const sdJwtClaims: ClaimEntry[] = await getClaims(
            decodedSdJwt.jwt.payload,
            decodedSdJwt.disclosures,
            digest,
        )

        return Object.entries(sdJwtClaims)
            .filter(([key, value]) =>
                !['cnf', 'exp', 'iat', 'iss', 'vct'].includes(key) &&
                !(typeof value === 'object' && Object.keys(value).length === 0))
            .map(([key, value]) => ({
                key: key.replaceAll('_', ' '),
                value: typeof value === 'object' ? JSON.stringify(value) : String(value)
            }));

    } catch (error) {
        console.error('Error during getSdJwtClaims', error);
        throw Error()
    }
}

export async function getMdocClaims(vpToken: string): Promise<ClaimEntry[] | undefined> {
    try {
        const buf: Buffer = Buffer.from(vpToken, 'base64');
        const valueOut = await cbor.decodeFirst(buf, {
            preferWeb: true
        });
        const namespaces = valueOut.documents[0].issuerSigned.nameSpaces;
        const firstNamespace = Object.entries(namespaces)[0][0];
        const dataArray: TagValue[] = namespaces[firstNamespace];

        const requestDataPromises = dataArray.map((item: TagValue) => cbor.decodeFirst(item.value, { preferWeb: true }));
        const requestData = await Promise.all(requestDataPromises);

        return requestData.map((item: { elementIdentifier: string, elementValue: string }) => {
            return { key: item.elementIdentifier.replaceAll('_', ' '), value: item.elementValue };
        })
    } catch (error) {
        console.error('Error during getMdocClaims', error);
        throw Error()
    }
}
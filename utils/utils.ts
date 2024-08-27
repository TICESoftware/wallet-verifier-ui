import {type DecodedSDJwt, decodeSdJwt, getClaims} from "@sd-jwt/decode";
import {digest} from "@sd-jwt/crypto-browser";
import type {TagValue} from "~/models/TagValue";
import * as cbor from 'cbor-web';
import {Buffer} from 'buffer';

export async function getSdJwtClaims(vpToken: string): Promise<{  key: string; value: string }[] | undefined> {
    // TODO: edit for multiple Presentations + check nonce

    try {
        const decodedSdJwt: DecodedSDJwt = await decodeSdJwt(vpToken, digest);
        return await getClaims(
            decodedSdJwt.jwt.payload,
            decodedSdJwt.disclosures,
            digest,
        )
    } catch (error) {
        console.error('Error during getSdJwtClaims', error);
        throw Error()
    }
}

export async function getMdocClaims(vpToken: string): Promise<{
    // TODO: edit for multiple Presentations + check nonce

    [p: string]: { key: string; value: string }
} | undefined> {
    try {

        const buf: Buffer = Buffer.from(vpToken, 'base64');

        const valueOut = await cbor.decodeFirst(buf, {
            preferWeb: true

        });
        const namespaces = valueOut.documents[0].issuerSigned.nameSpaces;
        const firstNamespace = Object.entries(namespaces)[0][0];
        const dataArray: TagValue[] = namespaces[firstNamespace];

        const requestDataPromises = dataArray.map((item: TagValue) => cborDecode(item.value));
        const requestData = await Promise.all(requestDataPromises);

        const claims: { key: string; value: string }[]  = requestData.map((item: { elementIdentifier: string, elementValue: string }) => {
            return {key: item.elementIdentifier.replaceAll('_', ' '), value: item.elementValue};
        });

        return Object.fromEntries(
            Object.entries(claims)) as { [key: string]: { key: string; value: string } };

    } catch (error) {
        console.error('Error during getMdocClaims', error);
        throw Error()
    }
}

async function cborDecode(buf: Uint8Array) {
    return cbor.decodeFirst(buf, {
        preferWeb: true
    });
}
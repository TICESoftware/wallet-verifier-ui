export type TransactionRequest = {
    nonce: string;
    presentation_definition: PresentationDefinition;
    type: string;
    wallet_response_redirect_uri_template: string;
    response_mode: string;
}

type PresentationDefinition = {
    id: string;
    input_descriptors: InputDescriptor[];
}

type InputDescriptor = {
    id: string;
    name: string;
    purpose: string;
    format: Format | ZkpFormat;
    constraints: Constraint;
}

export type Format = {
    "mso_mdoc": {
        alg: string[];
    }
} | {
    "vc+sd-jwt": {
        alg: string[];
    }
}

export type ZkpFormat = {
    "vc+sd-jwt+zkp": {
        proof_type: string[];
    }
} | {
    "mso_mdoc+zkp": {
        proof_type: string[];
    }
}
type Constraint = {
    fields: Field[];
}

type Field = {
    path: string[];
    intent_to_retain: boolean;
}
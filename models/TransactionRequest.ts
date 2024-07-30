export type TransactionRequest = {
    nonce: string;
    presentation_definition: PresentationDefinition;
    type: string;
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
    format: Format;
    constraints: Constraint;
}

type Format = {
    mso_mdoc: {
        alg: string[];
    };
}

type Constraint = {
    fields: Field[];
}

type Field = {
    path: string[];
    intent_to_retain: boolean;
}
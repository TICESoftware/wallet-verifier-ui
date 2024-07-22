export type PresentationRequest = {
    nonce: string;
    presentation_definition: PresentationDefinition;
    type: string;
    response_mode: string; // maybe optional?
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


// {
//     "type": "vp_token",
//     "presentation_definition": {
//     "id": "32f54163-7166-48f1-93d8-ff217bdb0653",
//         "input_descriptors": [
//         {
//             "id": "eu.europa.ec.eudiw.pid.1",
//             "name": "EUDI PID",
//             "purpose": "We need to verify your identity",
//             "format": {
//                 "mso_mdoc": {
//                     "alg": [
//                         "ES256",
//                         "ES384",
//                         "ES512",
//                         "EdDSA",
//                         "ESB256",
//                         "ESB320",
//                         "ESB384",
//                         "ESB512"
//                     ]
//                 }
//             },
//             "constraints": {
//                 "fields": [
//                     {
//                         "path": [
//                             "$['eu.europa.ec.eudiw.pid.1']['family_name']"
//                         ],
//                         "intent_to_retain": false
//                     },
//                     {
//                         "path": [
//                             "$['eu.europa.ec.eudiw.pid.1']['issuing_jurisdiction']"
//                         ],
//                         "intent_to_retain": false
//                     }
//                 ]
//             }
//         }
//     ]
// },
//     "nonce": "55410e05-b4da-42f3-a42a-2994124e0aa6",
//     "response_mode": "direct_post"
// }
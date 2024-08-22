export type WalletResponse = {
    state: string;
    vp_token: string; // TODO: add string[]
    presentation_submission: PresentationSubmission;
    nonce: string;
}

type PresentationSubmission = {
    id: string;
    definition_id: string;
    descriptor_map: DescriptorMap[];
}

type DescriptorMap = {
    id: string;
    format: string;
    path: string;
}
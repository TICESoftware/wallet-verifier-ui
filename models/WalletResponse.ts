export type WalletResponse = {
    state: string;
    vp_token: string;
    presentation_submission: PresentationSubmission;
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
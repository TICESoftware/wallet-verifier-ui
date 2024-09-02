export type ClaimSignature = {
    [key: string]: string;
}
export const MDocClaims: ClaimSignature = {
    'Familienname': 'family_name',
    'Geburtsname': 'family_name_birth',
    'Geburtsdatum': 'birthdate',
    'Alter in Geburtsjahren': 'age_birth_year',
    'Alter in Jahren': 'age_in_years',
    'Über 12': 'age_over_12',
    'Über 14': 'age_over_14',
    'Über 16': 'age_over_16',
    'Über 18': 'age_over_18',
    'Über 21': 'age_over_21',
    'Über 65': 'age_over_65',
    'Geburtsort': 'birth_place',
    'Wohnland': 'resident_country',
    'Wohnstadt': 'resident_city',
    'Postleitzahl': 'resident_postal_code',
    'Wohnstraße': 'resident_street',
    'Nationalität': 'nationality',
    'Ausstellungsdatum': 'issuance_date',
    'Ablaufdatum': 'expiry_date',
    'Ausstellungsland': 'issuing_country',
    'Ausstellende Behörde': 'issuing_authority',
};

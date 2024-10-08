import type {ClaimSignature} from "~/models/MDocClaims";

export const SdJwtClaims: ClaimSignature = {
    'Name': 'given_name',
    'Familienname': 'family_name',
    'Geburtsname': 'birth_family_name',
    'Geburtsdatum': 'birthdate',
    'Alter in Geburtsjahren': 'age_birth_year',
    'Alter in Jahren': 'age_in_years',
    'Über 12': 'age_equal_or_over.12',
    'Über 14': 'age_equal_or_over.14',
    'Über 16': 'age_equal_or_over.16',
    'Über 18': 'age_equal_or_over.18',
    'Über 21': 'age_equal_or_over.21',
    'Über 65': 'age_equal_or_over.65',
    'Geburtsort': 'place_of_birth.locality',
    'Wohnstadt': 'address.locality',
    'Postleitzahl': 'address.postal_code',
    'Wohnadresse': 'address.street_address',
    'Nationalität': 'nationalities',
    'Ausstellungsland': 'issuing_country',
    'Ausstellende Behörde': 'issuing_authority',
};

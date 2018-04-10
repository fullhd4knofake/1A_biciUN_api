export const profilePicturesTypeDef = `
type ProfilePicture {
    id: Int!
    Student: Int!
    Url: String
}
`;

export const profilePicturesQueries = `
    allProfilePictures: [ProfilePicture]!
    profilePictureById(id: Int!): ProfilePicture!
`;

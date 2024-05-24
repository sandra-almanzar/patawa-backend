export function userSelectData(extraParams) {
  return {
    userId: true,
    email: true,
    fullName: true,
    age: true,
    documentTypeId: true,
    documentNumber: true,
    ...extraParams,
    createdAt: true,
    lastLoginAt: true,
    avatarUrl: true,
    Addresses: true,
    Phones: true,
    enabled: true,
    UserRoles: {
      include: {
        Role: true,
      },
    },
  };
}

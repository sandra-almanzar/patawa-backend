import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const documentTypes = [
    { typeName: "Cédula de Ciudadanía", abbreviation: "CC" },
    { typeName: "Tarjeta de Identidad", abbreviation: "TI" },
    { typeName: "Pasaporte", abbreviation: "PA" },
    { typeName: "NIT", abbreviation: "NIT" },
    { typeName: "Registro Civil", abbreviation: "RC" },
    // Agrega más tipos de documentos si es necesario
  ];

  console.log("Start seeding...");

  for (const dt of documentTypes) {
    const documentType = await prisma.documentType.upsert({
      where: { typeName: dt.typeName },
      update: {},
      create: dt,
    });
    console.log(
      `Created document type with id: ${documentType.documentTypeId}`
    );
  }

  // Aquí puedes agregar otros datos iniciales como los roles, si es necesario.
  // Por ejemplo, para roles:
  const roles = [
    { roleName: "administrador" },
    { roleName: "propietario" },
    { roleName: "paseador" },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { roleName: role.roleName },
      update: {},
      create: role,
    });
  }
  const breeds = [
    { breedName: "Golden Retriever" },
    { breedName: "Husky Siberiano" },
    { breedName: "Pastor Aleman" },
    { breedName: "Poodle" },
    { breedName: "Beagle" },
    { breedName: "Rottweiler" },
    { breedName: "Boxer" },
    { breedName: "Pincher" },
    { breedName: "Bull terrier" },
  ];
  for (const breed of breeds) {
    await prisma.breed.upsert({
      where: { breedName: breed.breedName },
      update: {},
      create: breed,
    });
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

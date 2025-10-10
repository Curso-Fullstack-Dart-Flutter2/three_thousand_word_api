-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordInfo" (
    "id" SERIAL NOT NULL,
    "palavra" TEXT NOT NULL,
    "traducao" TEXT NOT NULL,
    "pronuncia" TEXT NOT NULL,

    CONSTRAINT "WordInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WordInfo_palavra_key" ON "WordInfo"("palavra");

-- CreateTable
CREATE TABLE "team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" JSONB,
    "year_fundation" INTEGER NOT NULL,
    "stadium" TEXT NOT NULL,
    "stateOrigin" TEXT NOT NULL,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clashes" (
    "id" TEXT NOT NULL,
    "homeTeamId" TEXT,
    "awayTeamId" TEXT,

    CONSTRAINT "clashes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "team_name_key" ON "team"("name");

-- CreateIndex
CREATE UNIQUE INDEX "team_stadium_key" ON "team"("stadium");

-- AddForeignKey
ALTER TABLE "clashes" ADD CONSTRAINT "clashes_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clashes" ADD CONSTRAINT "clashes_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

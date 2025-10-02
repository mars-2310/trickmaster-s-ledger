-- CreateEnum
CREATE TYPE "public"."Provider" AS ENUM ('Google');

-- CreateEnum
CREATE TYPE "public"."MemberRole" AS ENUM ('OWNER', 'EDITOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "public"."SparkCategory" AS ENUM ('COMEDY', 'ACROBATICS', 'MAGIC', 'GRAND_FINALE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."ConnectionType" AS ENUM ('BUILDS_ON', 'COMBINES_WITH', 'INSPIRED_BY', 'PART_OF');

-- CreateEnum
CREATE TYPE "public"."ActivityType" AS ENUM ('SPARK_CREATED', 'SPARK_UPDATED', 'SPARK_DELETED', 'SPARK_EXPANDED', 'CONNECTION_CREATED', 'MEMBER_JOINED', 'MEMBER_LEFT');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "provider" "public"."Provider" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Legders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "isShared" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Legders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sparks" (
    "id" TEXT NOT NULL,
    "LedgerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Sparks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ledgers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "owner_id" TEXT NOT NULL,
    "is_shared" BOOLEAN NOT NULL DEFAULT false,
    "share_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ledgers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ledger_members" (
    "id" TEXT NOT NULL,
    "ledger_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" "public"."MemberRole" NOT NULL DEFAULT 'EDITOR',
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ledger_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sparks" (
    "id" TEXT NOT NULL,
    "ledger_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" "public"."SparkCategory" NOT NULL DEFAULT 'OTHER',
    "is_expanded" BOOLEAN NOT NULL DEFAULT false,
    "expanded_content" TEXT,
    "voice_url" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sparks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."spark_connections" (
    "id" TEXT NOT NULL,
    "from_spark_id" TEXT NOT NULL,
    "to_spark_id" TEXT NOT NULL,
    "connection_type" "public"."ConnectionType" NOT NULL,
    "strength" INTEGER NOT NULL DEFAULT 5,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "spark_connections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."activities" (
    "id" TEXT NOT NULL,
    "ledger_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "action_type" "public"."ActivityType" NOT NULL,
    "resource_id" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ledgers_share_code_key" ON "public"."ledgers"("share_code");

-- CreateIndex
CREATE INDEX "ledgers_owner_id_idx" ON "public"."ledgers"("owner_id");

-- CreateIndex
CREATE INDEX "ledgers_share_code_idx" ON "public"."ledgers"("share_code");

-- CreateIndex
CREATE INDEX "ledger_members_ledger_id_idx" ON "public"."ledger_members"("ledger_id");

-- CreateIndex
CREATE INDEX "ledger_members_user_id_idx" ON "public"."ledger_members"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "ledger_members_ledger_id_user_id_key" ON "public"."ledger_members"("ledger_id", "user_id");

-- CreateIndex
CREATE INDEX "sparks_ledger_id_idx" ON "public"."sparks"("ledger_id");

-- CreateIndex
CREATE INDEX "sparks_created_by_id_idx" ON "public"."sparks"("created_by_id");

-- CreateIndex
CREATE INDEX "sparks_category_idx" ON "public"."sparks"("category");

-- CreateIndex
CREATE INDEX "sparks_created_at_idx" ON "public"."sparks"("created_at");

-- CreateIndex
CREATE INDEX "spark_connections_from_spark_id_idx" ON "public"."spark_connections"("from_spark_id");

-- CreateIndex
CREATE INDEX "spark_connections_to_spark_id_idx" ON "public"."spark_connections"("to_spark_id");

-- CreateIndex
CREATE UNIQUE INDEX "spark_connections_from_spark_id_to_spark_id_key" ON "public"."spark_connections"("from_spark_id", "to_spark_id");

-- CreateIndex
CREATE INDEX "activities_ledger_id_created_at_idx" ON "public"."activities"("ledger_id", "created_at");

-- CreateIndex
CREATE INDEX "activities_user_id_idx" ON "public"."activities"("user_id");

-- AddForeignKey
ALTER TABLE "public"."ledgers" ADD CONSTRAINT "ledgers_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ledger_members" ADD CONSTRAINT "ledger_members_ledger_id_fkey" FOREIGN KEY ("ledger_id") REFERENCES "public"."ledgers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ledger_members" ADD CONSTRAINT "ledger_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sparks" ADD CONSTRAINT "sparks_ledger_id_fkey" FOREIGN KEY ("ledger_id") REFERENCES "public"."ledgers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sparks" ADD CONSTRAINT "sparks_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."spark_connections" ADD CONSTRAINT "spark_connections_from_spark_id_fkey" FOREIGN KEY ("from_spark_id") REFERENCES "public"."sparks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."spark_connections" ADD CONSTRAINT "spark_connections_to_spark_id_fkey" FOREIGN KEY ("to_spark_id") REFERENCES "public"."sparks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."activities" ADD CONSTRAINT "activities_ledger_id_fkey" FOREIGN KEY ("ledger_id") REFERENCES "public"."ledgers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."activities" ADD CONSTRAINT "activities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

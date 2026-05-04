import { PrismaClient } from "@prisma/client";

interface CreateUserParams {
  name: string;
  username: string;
  email: string;
  password: string;
  profileImage?: string;
}

export class AuthRepository {
  constructor(private prisma: PrismaClient) {}

  public async createUser(data: CreateUserParams) {
    return this.prisma.user.create({ data });
  }

  public async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  public async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
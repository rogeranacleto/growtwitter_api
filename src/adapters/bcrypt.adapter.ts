import bcrypt from "bcrypt";

export class BcryptAdapter {
  public hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  public comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
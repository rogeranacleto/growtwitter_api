import { AuthRepository } from "../repositories/index";
import { BcryptAdapter, JwtAdapter } from "../adapters/index";
import { CreateUserDto, LoginUserDto } from "../dtos/index";
import { HTTPError } from "../utils/http.error";

export class AuthService {
  constructor(private authRepository: AuthRepository) { }

  public async register(data: CreateUserDto) {
    const userExists = await this.authRepository.findByEmail(data.email);

    if (userExists) {
      throw new HTTPError(409, "Usuario ja existe!");
    }

    const hashedPassword = await BcryptAdapter.hashPassword(data.password);

    const user = await this.authRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  public async login(data: LoginUserDto) {
    const user = await this.authRepository.findByEmail(data.email);
    if (!user) {
      throw new HTTPError(401, "E-mail ou senha invalidos, verifique!");
    }

    const isPasswordValid = await BcryptAdapter.comparePassword(
      data.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HTTPError(401, "E-mail ou senha invalidos, verifique.");
    }

    const token = JwtAdapter.generateToken(user.id, user.name, user.username);

    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }
}
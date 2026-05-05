import { UserRepository } from "../repositories/index";
import { BcryptAdapter, JwtAdapter } from "../adapters/index";
import { CreateUserDto, LoginUserDto } from "../dtos/index";
import { HTTPError } from "../utils/index";

export class AuthService {
  constructor(private userRepository: UserRepository, private bcryptAdapter: BcryptAdapter, private jwtAdapter: JwtAdapter) { }

  public async register(data: CreateUserDto) {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new HTTPError(409, "Usuario ja existe!");
    }

    const hashedPassword = await this.bcryptAdapter.hashPassword(data.password);

    const user = await this.userRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  public async login(data: LoginUserDto) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new HTTPError(401, "E-mail ou senha invalidos, verifique!");
    }

    const isPasswordValid = await this.bcryptAdapter.comparePassword(
      data.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HTTPError(401, "E-mail ou senha invalidos, verifique.");
    }

    const token = this.jwtAdapter.generateToken(user.id, user.name, user.username);

    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }
}
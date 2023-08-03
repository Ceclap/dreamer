import { ConflictException, HttpCode, HttpException, Injectable, NotFoundException, Redirect } from "@nestjs/common";
import { InjectModel} from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt';
import { ConfigService } from "@nestjs/config";
import { MailService } from "../mail/mail.service";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Injectable()
export class AuthService {

	constructor(
		@InjectModel('User') private readonly UserModel: Model<User>,
		private readonly mailService: MailService,
		private readonly configService: ConfigService,
		private jwtService: JwtService
	) {}
  async singUp(body) {
		let user = await this.UserModel.findOne({ email: body.email });
		if(user)
		{
			throw new ConflictException('User already exists');
		}

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(body.password, salt)

		const payload = { email: body.email, passwordHash: hash }
		const token = await this.jwtService.signAsync(payload)

		const message:string = `Welcome to Dreamerz! To confirm the email address, click here: http://localhost:3000/confirmationEmail/${token}`
		await this.mailService.sendUserConfirmation(body.email,"Email Confirmation", message)

		const respons = {
			message: "succes",
			token: token,
		}

		return JSON.stringify(respons);
  }
	async confirmationEmail(req,res){
		const token =req.params.token;
		const payload = await this.jwtService.verifyAsync(
			token,
			{
				secret: jwtConstants.secret
			}
		);
		let user = await this.UserModel.findOne({ email: payload.email });
		if (user) {
		res.redirect(`http://localhost:5173/success`)
			return
		}

		const doc = new this.UserModel({
			email: payload.email,
			passwordHash: payload.hash
		});

		await doc.save();
		console.log("All good");
		res.redirect(`http://localhost:5173/success`)
	}

	async singIn(body){
		const user = await this.UserModel.findOne({ email: body.email });
		if (!user) {
			throw new NotFoundException('User was not found');
		}

		const isValidPassword = await bcrypt.compare(body.password, user.passwordHash);
		if (!isValidPassword) {
			throw new HttpException({message: "Login problems"},401)
		}
		const payload = {
			id: user._id
		}
		const token = await this.jwtService.signAsync(payload)
		const respons = {
			message: "succes",
			user_id: user._id,
			token
		}
		return JSON.stringify(respons)
	}
}
import { IsEmail, IsNotEmpty, IsString, IsUrl, Matches, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateCandidateDTO {

    @IsString()
    @MinLength(2)
    @MaxLength(50)
    @IsNotEmpty()
    names: string

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Matches(/^\+250\d{9}$/, {
        message: 'Mobile number must start with "+250" and have 9 digits after that.',
    })
    readonly telephone: string;

    @IsString()
    @MinLength(10)
    @MaxLength(5000)
    @IsNotEmpty()
    readonly mission: string
}
import { hashSync } from "bcrypt";
import { config } from "dotenv";
import { Request, Response } from "express";
import prisma from "../prisma/prisma-client";
import ServerResponse from "../utils/ServerResponse";
import { Prisma } from "@prisma/client";
import { paginator } from "../utils/paginator";
import { AuthRequest } from "../types";

config()

const createCandidate = async (req: Request, res: Response) => {
    try {
        const { email, mission, names, telephone } = req.body
        const hashedPassword = hashSync(`!${telephone}.rw`, 10)
        const user = await prisma.user.create({
            data: {
                email,
                telephone,
                names,
                role: "CANDIDATE",
                password: hashedPassword
            }
        })
        const candidate = await prisma.candidate.create({
            data: {
                user: {
                    connect: {
                        id: user.id
                    }
                },
                mission
            }
        })
        return ServerResponse.created(res, "Candidate created successfully, password is ![telephone].rw", { candidate, user })
    } catch (error: any) {
        if (error.code === 'P2002') {
            const key = error.meta.target[0]
            return ServerResponse.error(res, `${key.charAt(0).toUpperCase() + key.slice(1)} (${req.body[key]}) already exists`, 400);
        }
        return ServerResponse.error(res, "Error occured", { error })
    }
}

const deleteCandidate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const candidate = await prisma.candidate.delete({
            where: {
                id
            }
        })
        return ServerResponse.success(res, "Candidate deleted successfully", { candidate })
    } catch (error: any) {
        return ServerResponse.error(res, "Error occured", { error })
    }
}

const getCandidates = async (req: Request, res: Response) => {
    try {
        const { searchKey, page, limit } = req.query;

        if (parseInt(page as string) <= 0) return ServerResponse.error(res, "Page number cannot be less than or equal to 0")
        if (parseInt(limit as string) <= 0) return ServerResponse.error(res, "Limit number cannot be less than or equal to 0")

        const whereCondition: Prisma.CandidateWhereInput = {};
        if (searchKey) {
            whereCondition.OR = [
                {
                    user: {
                        names: {
                            contains: searchKey as string,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    user: {
                        email: {
                            contains: searchKey as string,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    user: {
                        telephone: {
                            contains: searchKey as string,
                            mode: "insensitive",
                        },
                    },
                },
            ];
        }
        const candidates = await prisma.candidate.findMany({
            where: whereCondition,
            skip: page && limit ? ((parseInt(page as string) - 1) * parseInt(limit as string)) : 0,
            take: limit ? Number(limit) : 10,
        });
        const total = await prisma.candidate.count({});
        return ServerResponse.success(res, "Candidates fetched successfully", {
            candidates,
            meta: paginator({
                page: page ? Number(page) : 1,
                limit: limit ? Number(limit) : 10,
                total,
            }),
        });

    } catch (error: any) {

    }
}

const getCandidateById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const candidate = await prisma.candidate.findUnique({
            where: {
                id
            }
        })
        return ServerResponse.success(res, "Candidate fetched successfully", { candidate })
    } catch (error: any) {
        return ServerResponse.error(res, "Error occured", { error })
    }
}

const voteCandidate:any = async (req: AuthRequest, res: Response) => {
    try {
        const { candidate } = req.params
        const { id } = req.user
        const vote = await prisma.vote.create({
            data: {
                voter: {
                    connect: {
                        id
                    }
                },
                candidate: {
                    connect: {
                        id: candidate
                    }
                }
            }
        })
        return ServerResponse.success(res, "Candidate voted successfully", { candidate })
    } catch (error: any) {
        // Catch error if user has already voted for the candidate
        if (error.code === "P2002") {
            return ServerResponse.error(res, "You have already voted for this candidate", 400)
        }
        return ServerResponse.error(res, "Error occured", { error })
    }
}

const candidateController = {
    createCandidate,
    getCandidates,
    voteCandidate,
    getCandidateById,
    deleteCandidate
}

export default candidateController;
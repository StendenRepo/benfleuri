import prisma from '../src/libs/prisma';

export async function createContext(req, res) {
  return {
    prisma,
  };
}

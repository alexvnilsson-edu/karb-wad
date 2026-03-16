import { customAlphabet } from 'nanoid';

const idSize = 8;
const idAlphabet = 'abcdef0123456789';

export const wadElementModelIdGenerator = customAlphabet(idAlphabet, idSize);

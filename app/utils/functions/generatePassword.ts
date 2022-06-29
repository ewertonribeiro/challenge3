
export default function generateRandomPass(): string {

  let pass = '';
  while (pass.length < 6) {
    const randomNumber = Math.floor(Math.random() * 9)
    pass += randomNumber;
  }
  return pass;
}



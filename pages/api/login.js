


export default async function handler(req, res) {
  const { username, password } = req.body;
  if (req.method === "POST") {
    console.log(process.env.Admin_Token);
    if (
      password === process.env.Admin_Password &&
      username === process.env.Admin_Username
    ) {
      res.status(200).json({ message: "succesfull",status:true });
    } else {
        return res.status(500).json({ message: "Wrong Credintials",status:false });
      }
  } 
 
}

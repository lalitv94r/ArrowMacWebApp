import { EmailAddress, GetOTP, Href, LginInWith, LogIn, LoginHeading, OneTimePassword, PhoneNumber, ResendOTP } from "@/Constant";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import imageOne from "../../../../public/assets/images/logo/logo.png";
import { isNotNull } from "@/utils/Utilities";
import useFetch from "@/network";
import api_urls from "@/network/apiUrls";
import TransparentLoader from "@/app/transparentLoader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const router = useRouter();

  const { post, loading } = useFetch();

  const formSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      email: email,
      phone: phone,
      code: otp,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    console.log("Result from signIn:", result);
    if (result?.ok) {
      toast.success("Successfully logged in.");
      router.push("/dashboard");
    } else {
      toast.error("Invalid Credentaial. Please try again.");
    }
  };

  const handleGetOTP = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let body: any = {};
      if (isNotNull(email)) {
        body.email = email;
      } else if (isNotNull(phone)) {
        body.phone = phone;
      }
      console.log("body", body);
      let response = await post(api_urls?.login, body);
      console.log("Response from login API:", response);
      if (response?.status === 200) {
        toast.success(response?.message || "OTP sent successfully");
        setShowOtpInput(true);
      } else {
        toast.error(response?.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error during login API call:", error);
      return;
    }
  };

  return (
    <div>
      {
        loading && <TransparentLoader />
      }
      <div>
        <Link className="logo text-center" href={Href}>
          <img className="img-fluid text-center" src={imageOne.src} alt="logo" />
        </Link>
      </div>
      <div className="login-main">
        {
          !showOtpInput ? (
            <Form className="theme-form" onSubmit={(e) => handleGetOTP(e)}>
              <h2 className="text-center">{LoginHeading}</h2>
              <p className="text-center">{"Enter your email or phone number to OTP for login"}</p>
              <FormGroup>
                <Label className="col-form-label">{EmailAddress}</Label>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormGroup>
              <div className="login-social-title">
                <h6>{LginInWith}</h6>
              </div>
              <FormGroup>
                <Label className="col-form-label">{PhoneNumber}</Label>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  name="phone"
                  onChange={(event) => setPhone(event.target.value)}
                />
              </FormGroup>
              <FormGroup className="mb-0 checkbox-checked">
                <div className="text-end mt-5">
                  <Button color="primary" block className="w-100">
                    {GetOTP}
                  </Button>
                </div>
              </FormGroup>
            </Form>)
            :
            (<Form className="theme-form" onSubmit={formSubmitHandle}>
              <h2 className="text-center">{OneTimePassword}</h2>
              <p className="text-center">{`Enter the OTP sent to your ${isNotNull(email) ? "email address" : "phone number"}`}</p>
              <FormGroup>
                <Label className="col-form-label">OTP</Label>
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  name="otp"
                  onChange={(event) => setOtp(event.target.value)}
                />
              </FormGroup>
              <div className="d-flex justify-content-end pointer resend-otp">
                <span>{ResendOTP}</span>
              </div>
              <FormGroup className="mb-0 checkbox-checked">
                <div className="text-end mt-5">
                  <Button color="primary" block className="w-100">
                    {LogIn}
                  </Button>
                </div>
              </FormGroup>
            </Form>
            )
        }
      </div>
    </div>
  );
};

export default Login;

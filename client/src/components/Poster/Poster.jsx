import React from "react";
import "./Poster.scss";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

const Poster = () => {
  const navigate = useNavigate();
  return (
    <main className='poster'>
      <section className='first'>
        <header className='h1'>
          Easy and secure access to your <br /> content
        </header>
        <div className='about text-muted h5'>
          Store, share, and collaborate on files and folders from your mobile
          device, tablet, or computer
        </div>
        <div className='buttons m-4'>
          <Button variant='contained' fullWidth onClick={() => navigate('/login')}>
            Go to Drive
          </Button>
        </div>
        <div className='detail'>
          <div className='text-muted'>Don't have an account?</div>
          <Link  to={"/signup"} className='mt-1'>
            <Button variant='text'>Sign up at no cost</Button>
          </Link>
        </div>
      </section>

      <section className='second'>
        <div>
          <img
          style={{
            width :"1080px",
            height:"360px",
            objectFit:"contain"
          }}
            src={
              "https://lh3.googleusercontent.com/6MmVl3TEiBeEJCFIIfzO5DIgengYGPCdhEe8M6lXA6_Eh_xsKHDL_K4CLC31dETfiCue1hFOEf30IkIqlbOStvTfYbY_G85oEtJHQqjgz6OSXco8Aw=w0-l80-sg-rj-c0xffffff"
            }
            alt='image'
          />
        </div>
      </section>
    </main>
  );
};

export default Poster;

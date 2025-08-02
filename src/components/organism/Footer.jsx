function Footer() {
  return (
    <main className="md:w-custom-max-main p-5 md:justify-self-center md:p-20">
      <footer className="">
        <div className="flex flex-col gap-7 md:flex-row md:items-start md:justify-around">
          <div>
            <img
              className="md:w-48"
              src="/logo-blue_tickitz.svg"
              alt="logo-blue-tickitz"
            />
            <p className="pt-4 text-gray-400">
              Stop waiting in the line. Buy tickets <br />
              conveniently, watch movies quietly.
            </p>
          </div>
          <div>
            <span className="text-[16px] font-semibold">Explore</span>
            <div className="flex flex-row flex-wrap gap-2 md:flex-col">
              <div className="block p-3 text-gray-400">Cinemas</div>
              <div className="block p-3 text-gray-400">Movie List</div>
              <div className="block p-3 text-gray-400">Notifikasi</div>
              <div className="block p-3 text-gray-400">My Ticket</div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="text-[16px] font-semibold">Our Sponsor</span>
            <div className="flex flex-row items-end gap-4 md:flex-col md:items-center">
              <img className="max-w-20" src="/logo-ebv_id.svg" alt="ebv_id" />
              <img
                className="max-w-20"
                src="/logo-CineOne21.svg"
                alt="cinema21"
              />
              <img className="max-w-20" src="/logo-hiflix2.svg" alt="hiflix" />
            </div>
          </div>
          <div>
            <div>
              <span className="text-[16px] font-semibold">Follow us</span>
              <div className="mt-3 flex flex-row gap-5 md:flex-col">
                <div className="flex flex-row gap-4">
                  <img src="/icon-gray_facebook-outline.svg" alt="facebook" />
                  <span className="hidden md:block">Tickitz Cinema id</span>
                </div>
                <div className="flex flex-row gap-4">
                  <img src="/icon-gray_instagram.svg" alt="instagram" />
                  <span className="hidden md:block">tickitz.id</span>
                </div>
                <div className="flex flex-row gap-4">
                  <img src="/icon-gray_twitter-outline.svg" alt="twitter" />
                  <span className="hidden md:block">ickitz.id</span>
                </div>
                <div className="flex flex-row gap-4">
                  <img src="/icon-gray_youtube.svg" alt="youtube" />
                  <span className="hidden md:block">Tickitz Cinema id</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-5 flex flex-row justify-start md:justify-center">
          <p className="text-[13px] font-normal text-gray-400">
            © 2020 Tickitz. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

export default Footer;

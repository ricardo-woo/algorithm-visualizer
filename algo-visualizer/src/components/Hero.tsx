export const Hero = () => {
  return (
    <div className="flex flex-col items-center gap-8 py-10 lg:flex-row">
      <div className="w-full lg:w-1/2">
        <h1 className="font-oxanium font-bold text-5xl ">
          ALGORITHMS FOR GAME DEVELOPERS
        </h1>
        <p className="text-muted">Hello</p>
      </div>
      <div className="w-full lg:w-1/2">
        <img
          src="https://imgs.search.brave.com/YntB0oFkkXwoye1wMNyZaiPxJ3cxNMTm-WUh1MJpM-U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA1/NDc3NjAwMC92ZWN0/b3IvYWxnb3JpdGht/LWNoYW5nZS1pc29t/ZXRyaWMtZmxhdC12/ZWN0b3ItY29uY2Vw/dHVhbC1pbGx1c3Ry/YXRpb24uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPUowSmFK/THlnVU0ya3Bydlg3/VVVBd0JwcHdnYkE3/TUVWVzV6SWJ1VnZj/Wkk9"
          className="w-full"
        />
      </div>
    </div>
  );
};

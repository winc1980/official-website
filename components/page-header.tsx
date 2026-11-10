import React from "react";

export default async function PageHeader({
  titleJa,
  titleEn,
  desc,
}: {
  titleJa: React.ReactNode;
  titleEn: React.ReactNode;
  desc?: React.ReactNode;
}) {
  return (
    <section className="w-full flex flex-col items-center border-t border-foreground/10 mt-24">
      <div className="w-full max-w-[1440px] flex flex-row items-stretch relative">
        <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10"></div>
        <div className="w-full max-w-7xl">
          <div className="flex flex-col justify-center">
            <section className="border-b border-foreground/10 w-full max-w-7xl py-8">
              <h2 className="text-3xl lg:text-5xl font-bold w-full divide-effect">
                <div className="pl-8">
                  <div className="font-mono font-normal text-sm opacity-60 px-1">{titleEn}</div>
                  {titleJa}
                </div>
              </h2>
              {desc != null ? (
                <div className="text-md text-foreground pt-8">
                  <div className="px-8 divide-effect">{desc}</div>
                </div>
              ) : (
                <></>
              )}
            </section>
          </div>
        </div>
        <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10"></div>
      </div>
    </section>
  );
}

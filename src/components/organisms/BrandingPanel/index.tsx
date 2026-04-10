export function BrandingPanel() {
    return (
        <section
            className="hidden lg:flex flex-col justify-center items-start px-8 py-10 lg:w-1/2 lg:min-h-screen min-h-40"
            style={{
                background: "linear-gradient(135deg, #0a0e27 0%, #24338d 100%)",
            }}
        >
            <div className="flex flex-col gap-4">
                <h1
                    className="text-white font-extrabold text-4xl lg:text-[60px] lg:leading-none"
                    style={{ letterSpacing: "-1.28px" }}
                >
                    EVENFLOW
                </h1>
                <p
                    className="hidden lg:block text-[#d3d3d3] font-normal text-2xl leading-relaxed"
                    style={{ letterSpacing: "-0.48px" }}
                >
                    Descrubre eventos, compra tus boletos, crea experiencias
                </p>
            </div>
        </section>
    );
}

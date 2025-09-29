import { Link } from "react-router-dom";
import backgroundVedio from "../assets/background vedio/backgroundVedio.mp4"
const intro = () => {

    return (
        <div className="relative w-full h-screen  ">
            <video src={backgroundVedio} autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" />
            <div className="relative w-full h-screen  flex items-center justify-center overflow-hidden">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40"></div>
                <Link to={"/"}>
                    <img src="../public/EY-GPT.webp" className="w-30 absolute top-0 left-0  " alt="logo" />
                </Link>
                {/* blur */}
                <div className="relative z-10 text-center text-white p-10 rounded-2xl 
                    bg-white/10 backdrop-blur-md shadow-2xl max-w-xl">
                    <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">
                        Welcome to <span className="text-amber-400">EY-GPT</span>
                    </h1>
                    <p className="text-lg mb-12 opacity-90">
                        Your AI assistant, ready to chat and answer anything.
                    </p>
                    
                    <div className="flex items-center justify-center  ">
                        <Link to={"/chat"}>
                            <button className=" flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white 
                            bg-gradient-to-r from-black via-gray-900 to-black 
                            border border-yellow-500 shadow-lg shadow-yellow-500/30 
                            hover:shadow-yellow-400/60 
                            hover:scale-105 
                            transition-all duration-300">
                                <img
                                    src="../public/EY-GPT.webp"
                                    alt="Eye of Horus"
                                    className="w-6 h-6"
                                />
                                Start Chatting
                            </button>

                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default intro

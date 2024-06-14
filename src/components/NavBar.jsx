"use client";

import Link from "next/link";
import Image from "next/image";

const NavBar = ({ logo }) => {
	return (
		<div className="flex justify-between items-center fixed z-10 w-full h-20 py-5 px-8 text-sm font-light top-0 bg-blueEmmagini">
			<ul className="flex items-center gap-3">
				<li className="font-semibold text-lg text-white">
					<Link href="/">
						<div className="w-[123px] h-[80px]">
							<Image src={logo} />
						</div>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default NavBar;

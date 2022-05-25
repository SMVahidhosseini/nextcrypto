const Footer = () => {
	return (
		<div className="footer">
			<div className="footersubdiv">
				Designed and developed by <span className="footerName">Seyed Mohammad Vahidhosseini</span>
			</div>
			<div className="footersubdiv">
				Ph.D. in Mechanical Engineering - Energy Conversion Division,
			</div>
			<div className="footersubdiv">
				Mechanical Engineering Department, Ferdowsi University of Mashhad, Mashhad, Iran
			</div>
			<div className="footersubdiv">
				Front-end web developer; React, React Native, Next, Svelte
			</div>
			<div className="footersubdiv">
				E-mail: <span className="footerName">moein.vahidhosseini@gmail.com</span>
			</div>
			<div className="footersubdiv">
				<div className="footersocial">
					<a href='https://scholar.google.com/citations?user=roHaKVcAAAAJ&hl=en' target="_blank" rel="noreferrer">
						<img src="/icons/scholar.svg" />
					</a>
					<a href='https://www.linkedin.com/in/seyed-mohammad-vahidhosseini-47468a151?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BEFQGpDNBQLOn5e%2BxjN9g6w%3D%3D' target="_blank" rel="noreferrer">
						<img src="/icons/linkedin.svg" />
					</a>
					<a href='https://www.researchgate.net/profile/Seyed-Mohammad-Vahidhosseini' target="_blank" rel="noreferrer">
						<img src="/icons/researchgate.svg" width="42vw" height="46vw"/>
					</a>
					<a href='https://github.com/SMVahidhosseini' target="_blank" rel="noreferrer">
						<img src="/icons/github.svg" width="50vw" height="50vw"/>
					</a>
				</div>
			</div>
		</div>
	);
}

export default Footer;
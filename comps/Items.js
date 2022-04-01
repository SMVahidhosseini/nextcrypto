import {useEffect} from 'react'
import Link from 'next/link'
import Searchbar from './Searchbar'

const Items = ({activeItem, setActiveItem}) => {
	const tabChange = (e) => {
		setActiveItem(e.target.innerText);
	}

	return(
		<div className="tabs">
			<div className="tabsul">
				<li className="tabsli" onClick={tabChange}>
					<div className={activeItem=='Home' ? 'tabsactive' : 'tabsdiv'}>
						<Link href="/"><a>Home</a></Link>
					</div>
				</li>
				<li className="tabsli" onClick={tabChange}>
					<div className={activeItem=='Portfolio' ? 'tabsactive' : 'tabsdiv'}>
						<Link href="/portfolio"><a>Portfolio</a></Link>
					</div>
				</li>
			</div>
			<Searchbar />
		</div>
	);
}

export default Items;
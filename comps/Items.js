import {useEffect} from 'react'
import Link from 'next/link'
import Searchbar from './Searchbar'

const Items = ({activeItem, setActiveItem}) => {
	const tabChange = (e) => {
		setActiveItem(e);
	}

	return(
		<div className="tabs">
			<div className="tabsul">
				<Link href="/">
					<a>
						<li className="tabsli" onClick={() => tabChange('Home')}>
							<div className={activeItem=='Home' ? 'tabsactive' : 'tabsdiv'}>Home</div>
						</li>
					</a>
				</Link>
				<Link href="/portfolio">
					<a>
						<li className="tabsli" onClick={() => tabChange('Portfolio')}>
							<div className={activeItem=='Portfolio' ? 'tabsactive' : 'tabsdiv'}>Portfolio</div>
						</li>
					</a>
				</Link>
			</div>
			<Searchbar />
		</div>
	);
}

export default Items;
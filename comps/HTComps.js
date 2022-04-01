import CoinsofPage from './CoinsofPage'

const HTComps = ({pageCoinNo, setPageCoinNo, sortItem, setsortItem, descendingorder, setdescendingorder}) => {
	return(
		<div className="htcomponents">
			<CoinsofPage pageCoinNo={pageCoinNo} setPageCoinNo={setPageCoinNo} descendingorder={descendingorder}
				setdescendingorder={setdescendingorder} sortItem={sortItem} setsortItem={setsortItem} />
		</div>
	);
}

export default HTComps;
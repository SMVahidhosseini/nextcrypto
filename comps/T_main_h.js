import { useState } from 'react';

const T_main_h = ({pageCoins, setpageCoins, sortItem, setsortItem, descendingorder, setdescendingorder}) => {
	let theader = ['#', 'Name', 'Price', '1h', '24h', '7d', 'Market Cap', 'Total Vol'];

	return (
		<div className="theadermain">
			{/*__________________________________________________________________________________________________________________*/}
			<div className={sortItem == 'market_cap_rank' ? 'theaderactiveonec' : 'theaderonec'} onClick={() => {
				setsortItem('market_cap_rank');
				setdescendingorder(!descendingorder);
			}} >
			<>{theader[0]}</>
			{sortItem == 'market_cap_rank' && descendingorder && <>&#x25b4;</>}
			{sortItem == 'market_cap_rank' && !descendingorder && <>&#x25be;</>}
			</div>
			{/*__________________________________________________________________________________________________________________*/}
			<div className="theadertable"> &nbsp;&nbsp;&nbsp;&nbsp; {theader[1]}</div>
			{/*__________________________________________________________________________________________________________________*/}
			<div className={sortItem == 'current_price' ? 'theaderpriceactive' : 'theaderprice'} onClick={() => {
				setsortItem('current_price');
				setdescendingorder(!descendingorder);
			}} >
			<>{theader[2]}</>
			{sortItem == 'current_price' && descendingorder && <>&#x25b4;</>}
			{sortItem == 'current_price' && !descendingorder && <>&#x25be;</>}
			</div>
			{/*__________________________________________________________________________________________________________________*/}
			<div className="theaderpercentage-home">
				{/*__________________________________________________________________________________________________________________*/}
				<div className={sortItem == 'price_change_percentage_1h_in_currency' ? 'theaderactive-1h' : 'theader-1h'} onClick={() => {
				setsortItem('price_change_percentage_1h_in_currency');
				setdescendingorder(!descendingorder);
				}} >
				<>{theader[3]}</>
				{sortItem == 'price_change_percentage_1h_in_currency' && descendingorder && <>&#x25b4;</>}
				{sortItem == 'price_change_percentage_1h_in_currency' && !descendingorder && <>&#x25be;</>}
				</div>
				{/*__________________________________________________________________________________________________________________*/}
				<div className={sortItem == 'price_change_percentage_24h' ? 'theaderactivepercentcell' : 'theaderpercentcell'} onClick={() => {
				setsortItem('price_change_percentage_24h');
				setdescendingorder(!descendingorder);
				}} >
				<>{theader[4]}</>
				{sortItem == 'price_change_percentage_24h' && descendingorder && <>&#x25b4;</>}
				{sortItem == 'price_change_percentage_24h' && !descendingorder && <>&#x25be;</>}
				</div>
				{/*__________________________________________________________________________________________________________________*/}
				<div className={sortItem == 'price_change_percentage_7d_in_currency' ? 'theaderactive-7d' : 'theader-7d'} onClick={() => {
				setsortItem('price_change_percentage_7d_in_currency');
				setdescendingorder(!descendingorder);
				}} >
				<>{theader[5]}</>
				{sortItem == 'price_change_percentage_7d_in_currency' && descendingorder && <>&#x25b4;</>}
				{sortItem == 'price_change_percentage_7d_in_currency' && !descendingorder && <>&#x25be;</>}
				</div>
				{/*__________________________________________________________________________________________________________________*/}
			</div>
			{/*__________________________________________________________________________________________________________________*/}
			<div className={sortItem == 'market_cap' ? 'homemarketcapheaderactive' : 'homemarketcapheader'} onClick={() => {
				setsortItem('market_cap');
				setdescendingorder(!descendingorder);
			}} >
			<>{theader[6]}</>
			{sortItem == 'market_cap' && descendingorder && <>&#x25b4;</>}
			{sortItem == 'market_cap' && !descendingorder && <>&#x25be;</>}
			</div>
			{/*__________________________________________________________________________________________________________________*/}
			<div className={sortItem == 'total_volume' ? 'theaderactive-vol' : 'theader-vol'} onClick={() => {
				setsortItem('total_volume');
				setdescendingorder(!descendingorder);
			}} >
			<>{theader[7]}</>
			{sortItem == 'total_volume' && descendingorder && <>&#x25b4;</>}
			{sortItem == 'total_volume' && !descendingorder && <>&#x25be;</>}
			</div>
			{/*__________________________________________________________________________________________________________________*/}
		</div>
	);
}

export default T_main_h;
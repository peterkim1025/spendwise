import React from 'react';
import './home.css'; // Import the CSS file for styling
import BBTech from '../../assets/img/expensetrack.png';
import serverDev from '../../assets/img/smartmoney.png';
import logo from '../../assets/img/logo.png';


const Home = () => {
  return (
    <section id='about'>
      <container className="titlecontainer">
      <p className="titlesm">WELCOME TO</p>
<span className="aboutTitle">Spendwise</span>
</container>


<span className="aboutDesc">SpendWise is a React.js application developed to empower individuals in 
managing their finances effectively. With a modern and intuitive user interface, SpendWise provides users with
 a comprehensive platform to track expenses, set budgets, and gain insights into their financial habits. <br /> <br />
 </span>

<div className="aboutCards">
    <div className="aboutCard">
        <img src={BBTech} alt="BBTech" className='aboutImg'/>
        <div className="aboutText">
            <h2>Expense Tracking History</h2>
            <p>Expense tracking history is crucial as it provides insights into spending patterns, aiding in
               informed financial decision-making. By monitoring expenses, individuals can create and adhere 
               to budgets, ensuring that they meet their financial goals and avoid overspending.</p>
        </div>
    </div>
    <div className="aboutCard">
        <img src={serverDev} alt="serverDev" className='aboutImg'/>
        <div className="aboutText">
            <h2>Responsible Money Management</h2>
            <p>Becoming a better money manager is essential for achieving financial stability and long-term 
              success. This includes budgeting, tracking expenses, saving regularly, 
              and investing wisely to secure financial well-being and achieve financial freedom.
            </p>
        </div>
    </div>
</div>
<img src={logo} alt='logo' className='logo'></img>
    </section>
  )
}

export default Home

import mealsImage from '../../assets/meals.png';
import HeaderCartButton from './HeaderCartButton';

// styles
import classes from './Header.module.css';

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton />
      </header>
      <div className={classes['main-image']}>
        <img
          src={mealsImage}
          alt='A table fuul of delicious food!'
        />
      </div>
    </>
  );
};

export default Header;

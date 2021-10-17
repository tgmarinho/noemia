import styles from './mainMenu.module.scss'
import React, { useState, useContext, useEffect } from 'react'
import { ControllersContext } from '../../../Contexts/ControllersContext'
import { CARDS_MENU } from '../../../utils/datas'
import CardNav from '../../molecules/cardNav'
import GenericCarousel from '../../molecules/genericCarousel'


export default function MainMenu() {
  const [menuItems, setMenuItems] = useState(CARDS_MENU)
  const controllersContext = useContext(ControllersContext)
  const { updateSelectedItemMenu, selectedItemMenu } = controllersContext

  useEffect(() => {
    const newMenuItems = menuItems

    newMenuItems.forEach((item) => {
      if (item.isActive) {
        updateSelectedItemMenu(item)
      }
    })
  }, [])

  useEffect(() => {
    if (selectedItemMenu.name) {
      const newMenuItems = menuItems

      newMenuItems.forEach((item) => {
        if (item.name === selectedItemMenu.name) {
          item.isActive = true
        } else {
          item.isActive = false
        }
      })
      setMenuItems([...newMenuItems])
    }
  }, [selectedItemMenu])

  const handleActive = itemSelected => {
    const newMenuItems = [...menuItems]


    newMenuItems.forEach((currentItem) => {
      if (currentItem === itemSelected) {
        currentItem.isActive = true;
        updateSelectedItemMenu(itemSelected)
      } else {
        currentItem.isActive = false;
      }
    })
    setMenuItems([...newMenuItems])
  }

  return (
    <div className={styles.mainMenu}>
      <GenericCarousel size={menuItems.length}>
        {menuItems.map(item =>
          <CardNav
            key={item.name}
            itemMenu={item}
            onClick={handleActive}
          />
        )}
      </GenericCarousel>
    </div>
  )
}

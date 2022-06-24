import {SubPage} from '../pages/consultations/Consultation'

interface TopNavProps{
    elements:Array<SubPage>;
    setSelected:Function;
    selected:SubPage;
}

const TopNav = (props:TopNavProps) => {
    const {elements,setSelected,selected} = props;
  return (
    <div className='topNav'>
        {elements.map((element:SubPage, i)=>{
            return <Tab key={`tab-${i}`} element={element} setSelected={setSelected} selected={selected}/>
        })}
    </div>
  )
}

export default TopNav;

interface TabProps{
    element:SubPage;
    setSelected:Function;
    selected:SubPage;
}

function Tab(props:TabProps){
    const {element,setSelected,selected} = props;

    return (
        <div className={element === selected?"topNav__tab topNav__tab--selected":"topNav__tab"} onClick={()=>{setSelected(element)}}>
            {element}
        </div>
    )
}
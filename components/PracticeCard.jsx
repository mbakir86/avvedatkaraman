import Image from 'next/image';
import Icon from './Icon';
export default function PracticeCard({item}){return <article className="practiceCard"><div className="practiceImage"><Image src={item.image} alt={item.title} fill sizes="(max-width: 760px) 100vw, 33vw"/></div><div className="practiceBody"><div className="iconCube"><Icon name="scales"/></div><h3>{item.title}</h3><p>{item.text}</p></div></article>}

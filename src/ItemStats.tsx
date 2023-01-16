import { Dispatch, useState } from "react";
import StatSelector from "./StatSelector";
import { StatType, Stat, Condition } from "./App";

interface ItemStatsProps {
    setItem: Dispatch<React.SetStateAction<Stat[]>>
}

function ItemStats({ setItem }: ItemStatsProps) {
    const [statCount, setStatCount] = useState<number>(0)
    const [stats, setStats] = useState<Stat[]>([]);

    const statSelectors = [];
    for (let i = 0; i < statCount; i++) {
        statSelectors.push(<StatSelector key={i} onChange={(value, type, condition) => {
            const newStats = [...stats.filter(stat => { return i !== stat.idx }), { idx: i, value: value, type: type, condition: condition }];
            setStats(newStats);
            setItem(newStats);
        }} />);
    }

    return <>
        <div className="d-flex justify-content-evenly mb-3">
            <button className="btn btn-primary" onClick={() => setStatCount(statCount + 1)}>Add Stat</button>
            <button className="btn btn-danger" onClick={() => {
                const newStats = [...stats.filter(stat => { return stat.idx < statCount - 1 })]
                setStats(newStats);
                setItem(newStats);
                setStatCount(Math.max(statCount - 1, 0));
            }}>Remove Last Stat</button>
        </div>
        {statSelectors}
    </>
}

export default ItemStats;
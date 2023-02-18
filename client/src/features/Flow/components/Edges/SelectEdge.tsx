import { EdgeProps, getBezierPath } from 'reactflow';
import { useDispatch } from 'react-redux';
import { onEdgesDataUpdate } from '../../../FlowSlice';

const SelectEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerEnd,
}: EdgeProps) => {
    const dispatch = useDispatch();

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const onChange = (
        evt: React.ChangeEvent<HTMLSelectElement>,
        id: string,
    ) => {
        evt.stopPropagation();

        dispatch(
            onEdgesDataUpdate({
                edgeId: id,
                data: evt.target.value,
            }),
        );
    };

    return (
        <>
            <path
                id={id}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <foreignObject
                width={120}
                height={40}
                x={labelX - 100 / 2}
                y={labelY - 40 / 2}
                className="edgebutton-foreignobject"
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <div>
                    {/*<button*/}
                    {/*    className="edgebutton"*/}
                    {/*    onClick={(event) => onEdgeClick(event, id)}*/}
                    {/*>*/}
                    {/*    ×*/}
                    {/*</button>*/}
                    <select onChange={(e) => onChange(e, id)}>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                    </select>
                </div>
            </foreignObject>
        </>
    );
};

export default SelectEdge;

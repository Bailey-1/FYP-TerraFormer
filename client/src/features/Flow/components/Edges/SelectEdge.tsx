import { EdgeProps, getBezierPath } from 'reactflow';
import { useDispatch, useSelector } from 'react-redux';
import { onEdgesDataUpdate } from '../../../FlowSlice';
import { RootState } from '../../../../store/store';
import resourceLookup from '../../../../resources/ResourceLookup';
import { useEffect } from 'react';

const SelectEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerEnd,
    data,
}: EdgeProps) => {
    const dispatch = useDispatch();

    const sourceNode = useSelector((state: RootState) =>
        state.flow.nodes.find((x) => x.id === data?.connection?.source),
    );

    const resourceNode = resourceLookup.find(
        (x) => x.name === sourceNode?.data.resourceState.type,
    );

    const resourceAttributes = resourceNode?.attributes || [];

    useEffect(() => {
        dispatch(
            onEdgesDataUpdate({
                edgeId: id,
                data: resourceAttributes[0] || '',
            }),
        );
    }, []);

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
                style={{ stroke: '#844fba', strokeWidth: '2px' }}
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
                    <select onChange={(e) => onChange(e, id)}>
                        {resourceAttributes.map((x) => (
                            <option key={x} value={x}>
                                {x}
                            </option>
                        ))}
                    </select>
                </div>
            </foreignObject>
        </>
    );
};

export default SelectEdge;

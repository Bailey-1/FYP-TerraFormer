const HighlightedText = ({
    text,
    searchArr,
}: {
    text: string;
    searchArr: string[];
}) => {
    const patt = new RegExp(`(${searchArr.join('|')})`, 'igm');
    const parts = String(text).split(patt);

    if (searchArr.length) {
        return (
            <>
                {parts.map((part, index) =>
                    patt.test(part) ? (
                        <mark
                            key={index}
                            className="bg-terraform-purple-default"
                        >
                            {part}
                        </mark>
                    ) : (
                        part
                    ),
                )}
            </>
        );
    } else {
        return <>{text}</>;
    }
};

export default HighlightedText;

type Props = {
    result: {
        data? : {
            message? : string,
        },
        serverError? : string,
        valaidationErrors? : Record<string, string[] | undefined>,
    }
}

const MessageBox = ({
    type, content,
} : {
    type : 'success' | 'error',
    content : React.ReactNode,
}) => (
    <div className={`bg-accent px-4 py-2 my-2 rounded-lg ${type === 'error' ? 'text-red-500' : ''}`}>
         {type === 'success' ? '✅' : '⚠️'} {content}
    </div>
)

export function DisplayServerActionResponse({result} : Props){
    const { data, serverError, valaidationErrors } = result

    return (
      <div>
          {data?.message && (
            <MessageBox type="success" content={`Succes: ${data?.message}`}/>
        )}
        {serverError && (
            <MessageBox type="error" content={`${serverError}`}/>
        )}
        {valaidationErrors && (
            <MessageBox type="error" content={`${Object.keys(valaidationErrors).map(key => (
                <p key={key}> {`${key} : ${valaidationErrors[key as keyof typeof valaidationErrors]}`}</p>
            ))}`}/>
        )}
      </div>
    )
}
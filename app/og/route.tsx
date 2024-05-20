import { ImageResponse } from 'next/og'
import { NextRequest, NextResponse } from 'next/server'
// The og image, dynamicly generated for the docs, homepage and components
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    // expect component to be a boolean e.g. true or null, if it's not defined
    const component = searchParams.get("component")
    
    // checking the value of component, if it's not the expected value, an error will be returned
    if (!(component == ("true" || "false" || null))) {
        return NextResponse.json({
            error: "type error in the component search params."
        })
    }


    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 128,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                wow
            </div>
        ),
        {
            width: 1200,
            height: 600,
        }
    )
}
import * as React from 'react'
import { Rating } from 'semantic-ui-react'
import { IPerformanceComments, IWorksComments } from '../reducers/worksDetails'
import { ArtistCard } from './'

import * as Styled from '../styles/components/commentList'
import * as ScoreStyled from '../styles/components/score'

// import 'semantic-ui-css/semantic.min.css'

export interface IProps {
    type: 'performance' | 'works' | 'standalone'
    initialWorksComments: IWorksComments[] | null
    initialPerformanceComments: IPerformanceComments[] | null
    dark: boolean
}

export class CommentList extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props)
    }

    public renderScore = (rate: number) => (
        <ScoreStyled.ScoreBox>
            <Rating
                maxRating={5}
                defaultRating={rate}
                disabled={true}
                size="large"
                icon="star"
            />
        </ScoreStyled.ScoreBox>
    )

    public renderComments = () => (
        this.props.type === 'works' ?
            this.props.initialWorksComments !== null ?
                this.props.initialWorksComments.map((data, key) => (
                    <div key={key}>
                        <Styled.Commnet>
                            <Styled.CommentElements>
                                <Styled.Artist><ArtistCard artistId={data.userId} style={'standalone'} size={50} nameHidden={true} color={'dark'} link={false} /></Styled.Artist>
                                <Styled.CommentContents>
                                    <li>{this.renderScore(data.score)}</li>
                                    <li>{data.content}</li>
                                    <Styled.PostedData>
                                        <li style={{marginRight: '10px'}}>{data.userId}</li>
                                        <li>
                                            {`
                                                ${data.createdAt.getFullYear()}/
                                                ${data.createdAt.getMonth()}/
                                                ${data.createdAt.getDay()}-
                                                ${data.createdAt.getHours()}:
                                                ${data.createdAt.getMinutes()}
                                            `}
                                        </li>
                                    </Styled.PostedData>
                                </Styled.CommentContents>
                            </Styled.CommentElements>
                        </Styled.Commnet>
                        {
                            this.props.initialWorksComments !== null ?
                                key !== this.props.initialWorksComments.length - 1 ?
                                    this.props.dark ?
                                        <Styled.LightSepatateLine />
                                        :
                                        <Styled.DarkSeparateLine />
                                    : null
                                : null
                        }
                    </div>
                ))
                : null
            :
            this.props.initialPerformanceComments !== null ?
                this.props.initialPerformanceComments.map((data, key) => (
                    <div key={key}>
                        <Styled.Commnet>
                            <Styled.CommentElements>
                                <Styled.Artist>{<ArtistCard artistId={data.userId} style={'standalone'} size={50} nameHidden={true} color={'dark'} link={false} />}</Styled.Artist>
                                <Styled.CommentContents>
                                    <li>{data.content}</li>
                                    <Styled.PostedData>
                                        <Styled.UserId>{data.userId}</Styled.UserId>
                                        <li>{data.createdAt.toString()}</li>
                                    </Styled.PostedData>
                                </Styled.CommentContents>
                            </Styled.CommentElements>
                        </Styled.Commnet>
                        {
                            this.props.initialPerformanceComments !== null ?
                                key !== this.props.initialPerformanceComments.length - 1 ?
                                    this.props.dark ?
                                        <Styled.LightSepatateLine />
                                        :
                                        <Styled.DarkSeparateLine />
                                    : null
                                : null
                        }
                    </div>
                ))
                : null
    )

    public render() {
        return (
            <Styled.Entire>
                {this.renderComments()}
            </Styled.Entire>
        )
    }
}
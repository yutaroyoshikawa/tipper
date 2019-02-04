import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react'
import { Dispatch } from 'redux'
import { Rating } from 'semantic-ui-react'
import * as actions from '../actions/commentBox'
import { IAuthState } from '../reducers/auth'
import { ICommentBoxState } from '../reducers/commentBox'
import { ArtistCard } from './'

import * as Styled from '../styles/components/commentBox'
import * as ScoreStyled from '../styles/components/score'

export interface IProps extends ICommentBoxState, IAuthState {
    dispatch: Dispatch<any>
}

export default class extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props)
    }

    public componentDidMount() {
        this.props.dispatch(actions.initializeCommentBox())
    }

    public hundleScoreChange = (e: React.MouseEvent<HTMLDivElement>, data: {rating: number; maxRating: number}  ) => (
        this.props.dispatch(actions.setRate(data.rating))
    )

    public renderScore = () => (
        this.props.commentBox.type === 'works' ?
            <div>
                <Styled.Score>
                    <ScoreStyled.ScoreBox>
                        <Rating
                            maxRating={5}
                            defaultRating={3}
                            icon="star"
                            size='massive'
                            onRate={this.hundleScoreChange}
                        />
                    </ScoreStyled.ScoreBox>
                </Styled.Score>
                <Styled.MobileScore>
                    <ScoreStyled.ScoreBox>
                        <Rating
                            maxRating={5}
                            defaultRating={3}
                            icon="star"
                            size='large'
                            onRate={this.hundleScoreChange}
                        />
                    </ScoreStyled.ScoreBox>
                </Styled.MobileScore>
            </div>
            :
            null
    )

    public setComment = (e: React.ChangeEvent<HTMLInputElement>) => (
        this.props.dispatch(actions.setComment(e.target.value))
    )

    public onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        this.props.dispatch(actions.requestSendComment())
    }

    public render() {
        return (
            <Styled.Form itemProp={this.props.commentBox.type} onSubmit={this.onSubmit.bind(this,)}>
                <Styled.Box>
                    <Styled.Artist>
                        <ArtistCard
                            artistId={this.props.auth.id}
                            size={40}
                            style={'standalone'}
                            nameHidden={false}
                            color={'light'}
                            link={false}
                        />
                    </Styled.Artist>
                    <Styled.ReviewBox>
                        {this.renderScore()}
                        <Styled.Comment
                            value={this.props.commentBox.comment}
                            maxLength={255}
                            placeholder="コメントをする"
                            itemProp={this.props.commentBox.type}
                            onChange={this.setComment.bind(this,)}
                        />
                    </Styled.ReviewBox>
                </Styled.Box>
                <Styled.SendBox>
                    <Styled.SendButton>
                        <Styled.SendIcon icon={faPaperPlane} />
                    </Styled.SendButton>
                </Styled.SendBox>
            </Styled.Form>
        )
    }
}
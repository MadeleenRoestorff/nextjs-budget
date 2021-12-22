import styled from '@emotion/styled';
import Pencil from '../../icons/Pencil';

export default function CardLayout({
  cards = [],
  cardkey = 'summary',
  Icon = Pencil,
  columns = 1,
  notaddblock = true,
}) {
  return (
    <CardContainer key={cardkey} columns={columns}>
      {cards.map((card, index) => {
        return (
          <CardStyling key={`${cardkey}-${index}`} columns={columns}>
            {card}
            {index == cards.length - 1 ? (
              notaddblock ? (
                <Icon />
              ) : null
            ) : (
              <Icon />
            )}
          </CardStyling>
        );
      })}
    </CardContainer>
  );
}

const CardContainer = styled.div`
  z-index: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: ${({ columns }) => (columns > 1 ? 'wrap' : 'nowrap')};
`;
const CardStyling = styled.div`
  margin: 30px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  width: ${({ columns }) => (columns > 1 ? 'calc(50% - 20px)' : '100%')};
  min-height: 200px;
  height: 100%;
  border-radius: 40px;
  padding: 20px;
  position: relative;

  background-color: hsla(0, 100%, 100%, 0.05);
  box-shadow:
		/* offset-x | offset-y | blur-radius | spread-radius | color */ 0px
      12px 17px 2px hsla(0, 0%, 0%, 0.14),
    0px 5px 22px 4px hsla(0, 0%, 0%, 0.12),
    0px 7px 8px -4px hsla(0, 0%, 0%, 0.2);

  &:hover > svg {
    opacity: 1;
  }

  & > svg {
    position: absolute;
    transition: opacity 0.1s ease-in-out;
    top: 0;
    right: 0;
    opacity: 0;
  }
`;

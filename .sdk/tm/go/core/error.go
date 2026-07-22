package core

type YaglaUrlShortenerError struct {
	IsYaglaUrlShortenerError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewYaglaUrlShortenerError(code string, msg string, ctx *Context) *YaglaUrlShortenerError {
	return &YaglaUrlShortenerError{
		IsYaglaUrlShortenerError: true,
		Sdk:              "YaglaUrlShortener",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *YaglaUrlShortenerError) Error() string {
	return e.Msg
}
